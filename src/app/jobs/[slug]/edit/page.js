"use client"

import { useRouter } from "next/navigation";
import { getUserId, getTokenFromLocalStorage } from "@/utils/auth";
import { useState, useEffect } from "react";
import { clearAlert, setAlert } from "@/redux/alert/alertSlice";
import { useDispatch } from "react-redux";

const updateJobs = ({ params }) => {
  const [data, setData] = useState({ job: {
    title: '',
      minAnnualCompensation: '',
      maxAnnualCompensation: '',
      employer: '',
      location: '',
      description: '',
      requirements: '',
      applicationInstructions: ''
  } });
  const [formErrors, setFormErrors] = useState([])
  const router = useRouter()
  const dispatch = useDispatch()

  function afterUpdateJobs(){
    router.push(`/jobs/${data.job.id}`)
  }

  async function userUpdateJob(evt) {
    evt.preventDefault();

    const jobData = {
      user: getUserId(),
      title: evt.target["title"].value,
      minAnnualCompensation: evt.target["minAnnualCompensation"].value,
      maxAnnualCompensation: evt.target["maxAnnualCompensation"].value,
      employer: evt.target["employer"].value,
      location: evt.target["location"].value,
      description: evt.target["description"].value,
      requirements: evt.target["requirements"].value,
      applicationInstructions: evt.target["applicationInstructions"].value
    };

    const resp = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
      `/api/collections/jobs/records/${params.slug}`,
      {
        method: "PATCH",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getTokenFromLocalStorage()
        },
        body: JSON.stringify(jobData),
      })

        if(resp.status === 200){
          afterUpdateJobs()
          dispatch(setAlert({message: "Job updated successfully", type: "alert-success"}));
          setTimeout(() => {
            dispatch(clearAlert());
          }, 3000)
        } else {
          const res = await resp.json();
          const newFormErrors = res.data;
          setFormErrors(newFormErrors);
          dispatch(setAlert({message: "Failed to update job", type: "alert-warning"}));
          setTimeout(() => {
            dispatch(clearAlert());
          }, 3000)
        };
      }
  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`);
        console.log(resp)

          const res = await resp.json();
          if (resp.status === 200) {
            if(res.user !=getUserId()){
              router.push(`/`)
              dispatch(setAlert({message: "Not job creater", type: "alert-error"}));
              setTimeout(() => {
                dispatch(clearAlert());
              }, 3000)
            }

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
  }, [params.slug]);

  return(
    <div>
            <h1 className="text-center text-3xl font-bold display-flex align-middle">Post a Job</h1>
                <form onSubmit={userUpdateJob} className="w-full left px-36">
                    <div className="form-control mt-5">
                        <label className="label" htmlFor="title">
                            <span className="label-text">Job Title</span>
                            </label>
                            <input
                            type="text"
                            name="title"
                            value = {data.job.title}
                            onChange={(e) => setData({ job: { ...data.job, title: e.target.value } })}
                            className="input input-bordered w-full"
                            required
                            />
                            {formErrors.title && (
                                <label className="label" htmlFor="title">
                                    <span className="label-text-alt text-red-500">
                                     {formErrors.title.message}
                                     </span>
                                 </label>
                            )}
                    </div>

                    <div className="form-control mt-5">
                        <label className="label" htmlFor="minAnnualCompensation">
                            <span className="label-text">Min Annual Compensation</span>
                            </label>
                            <input
                            type="text"
                            name="minAnnualCompensation"
                            value={data.job.minAnnualCompensation}
                            className='input input-bordered w-full'
                            onChange={(e) => setData({ job: { ...data.job, minAnnualCompensation: e.target.value } })}
                            required
                            />
                            {formErrors.minAnnualCompensation && (
                                <label className="label" htmlFor="minAnnualCompensation">
                                    <span className="label-text-alt text-red-500">
                                        {formErrors.minAnnualCompensation.message}
                                    </span>
                                </label>
                            )}
                    </div>

                    <div className="form-control mt-5">
                        <label className="label" htmlFor="maxAnnualCompensation">
                            <span className="label-text">Max Annual Compensation</span>
                            </label>
                            <input
                            type="text"
                            name="maxAnnualCompensation"
                            className="input input-bordered w-full"
                            value= {data.job.maxAnnualCompensation}
                            onChange={(e) => setData({ job: { ...data.job, maxAnnualCompensation: e.target.value } })}
                            required
                            />
                             {formErrors.maxAnnualCompensation && (
                                <label className="label" htmlFor="maxAnnualCompensation">
                                    <span className="label-text-alt text-red-500">
                                        {formErrors.maxAnnualCompensation.message}
                                    </span>
                                </label>
                            )}
                    </div>

                    <div className="form-control mt-5">
                        <label className="label" htmlFor="employer">
                            <span className="label-text">Company Name</span>0
                            </label>
                            <input
                            type="text"
                            name="employer"
                            value={data.job.employer}
                            onChange={(e) => setData({ job: { ...data.job, employer: e.target.value } })}
                            className="input input-bordered w-full"
                            required
                            />
                             {formErrors.employer && (
                                <label className="label" htmlFor="employer">
                                    <span className="label-text-alt text-red-500">
                                        {formErrors.employer.message}
                                    </span>
                                </label>
                            )}
                    </div>

                    
                    <div className="form-control mt-5">
                        <label className="label" htmlFor="location">
                            <span className="label-text">Job location</span>
                            </label>
                            <input
                            type="text"
                            name="location"
                            value={data.job.location}
                            onChange={(e) => setData({ job: { ...data.job, location: e.target.value } })}                            
                            className="input input-bordered w-full"
                            required
                            />
                             {formErrors.location && (
                                <label className="label" htmlFor="location">
                                    <span className="label-text-alt text-red-500">
                                        {formErrors.location.message}
                                    </span>
                                </label>
                            )}
                    </div>
                    
                    <div className="form-control mt-5">
                        <label className="label" htmlFor="description">
                            <span className="label-text">Description</span>
                            </label>
                            <input
                            type="text"
                            name="description"
                            value={data.job.description}
                            onChange={(e) => setData({ job: { ...data.job, description: e.target.value } })}
                            className="input input-bordered w-full"
                            required
                            />
                             {formErrors.description && (
                                <label className="label" htmlFor="description">
                                    <span className="label-text-alt text-red-500">
                                        {formErrors.description.message}
                                    </span>
                                </label>
                            )}
                    </div>

                    <div className="form-control mt-5">
                        <label className="label" htmlFor="requirements">
                            <span className="label-text">Requirements</span>
                            </label>
                            <input
                            type="text"
                            name="requirements"
                            value={data.job.requirements}
                            onChange={(e) => setData({ job: { ...data.job, requirements: e.target.value } })}
                            className="input input-bordered w-full"
                            required
                            />
                             {formErrors.requirements && (
                                <label className="label" htmlFor="requirements">
                                    <span className="label-text-alt text-red-500">
                                        {formErrors.requirements.message}
                                    </span>
                                </label>
                            )}
                    </div>

                    <div className="form-control mt-5">
                        <label className="label" htmlFor="applicationInstructions">
                            <span className="label-text">Application Instructions</span>
                            </label>
                            <input
                            type="text"
                            name="applicationInstructions"
                            value={data.job.applicationInstructions}
                            onChange={(e) => setData({ job: { ...data.job, applicationInstructions: e.target.value } })}
                            className="input input-bordered w-full"
                            required
                            />
                             {formErrors.applicationInstructions && (
                                <label className="label" htmlFor="applicationInstructions">
                                    <span className="label-text-alt text-red-500">
                                        {formErrors.applicationInstructions.message}
                                    </span>
                                </label>
                            )}
                    </div>
                    <div className="form-control w-full px-36 mt-5 mb-5">
                        <button className="btn text-3xl">UPDATE JOB</button>
                    </div>
                </form>
        </div>
    )
}

export default updateJobs;