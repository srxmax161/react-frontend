"use client"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserId } from '@/utils/auth';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const JobsSlug = ({ params }) => {
  const [data, setData] = useState({ job: {} });
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`);
        console.log(resp)

        if (resp.status === 200) {
          const res = await resp.json();

          setData({ job: res });
        } else {
          setData({ job: {} });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error logic here if needed
      }
    }

    fetchData();
  }, [params.slug]); // Dependency array ensures the effect runs when params.slug changes
  const isJobCreator = data.job.user === getUserId();

  return (
    <div>
		<div className="mt-5 ml-4">	
			<div className="flex">
				<div className="flex-1">
					<h1 className="text-3xl font-extrabold">{data.job.title}</h1>
					<p className="text-xl">{data.job.employer}</p>
				</div>
				<div>
				{isLoggedIn && isJobCreator && (
				<div className="flex mr-80">
					<Link className="btn-ghost rounded-2xl text-white font-bold py-2 px-4" href={`/jobs/${data.job.id}/edit`}>
						Update Job
					</Link>
				</div>
				)}
			</div>
			</div>

	<div className="flex flex-row w-full mt-8 mb-10">
		<div className="basis-2/3 prose max-w-none w-full">
			<h2 className="text-xl font-thin">Description</h2>
      <ReactMarkdown children={data.job.description}/>
			<div className="mt-6" />
			<h2 className="text-xl font-thin">Requirements</h2>
			<ReactMarkdown children={data.job.requirements}/>
			<div className="mt-6" />
			<h2 className="text-xl font-thin">How to Apply?</h2>
			<p>{data.job.applicationInstructions}</p>
		</div>
		<div className="basis-1/3 ml-4">
			<h2 className="text-xl font-thin">Location</h2>
			<p>{data.job.location}</p>
			<div className="mt-6" />
			<h2 className="text-xl font-thin">Salary Range</h2>
			<p>
				USD {data.job.minAnnualCompensation} - USD {
					data.job.maxAnnualCompensation
				}
			</p>
		</div>
	</div>
</div>
</div>
  );
}

export default JobsSlug;