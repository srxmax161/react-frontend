"use client";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState({ jobs: [] });

  // Define a function that makes an HTTP request to your backend to get data

  async function getJobs() {
    try {
      const resp = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          "/api/collections/jobs/records"
      );
      if (resp.status === 200) {
        const res = await resp.json();
        return { jobs: res.items };
      } else {
        return { jobs: [] };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return { jobs: [] };
    }
  }

  // Use useEffect to mimic Svelte's onMount
  useEffect(() => {
    async function fetchData() {
      const result = await getJobs();
      console.log(result);
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center text-xl font-bold display-flex align-middle">Find Your Next Job</h1>
      <div className="overflow-x-auto w-full">
        {data.jobs.map((job) => (
          <div className="flex flex-col mt-10 ml-5 mr-5" key={job.id}>
            <div>
              <a className="font-bold text-2xl" href={`/jobs/${job.id}`}>{job.title}</a>
              <div className="text-sm mt-1">
                {job.employer} . {job.location} .{" "}
                <span className="text-sm">
                  USD {job.minAnnualCompensation} - USD {job.maxAnnualCompensation}
                </span>
              </div>
              <div className="italic text-xs opacity-50 mt-2">
                posted {new Date(job.created).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
            <div className="mt-4">{job.description.slice(0, 240)}...</div>
          </div>
        ))}
      </div>
    </div>
  );
}