"use client"
import { useRouter } from "next/navigation";
import { getUserId } from "../../utils/auth";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert, setAlert } from "@/redux/alert/alertSlice";

export default function postJobs() {
    const router = useRouter();
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    useEffect(()=>{
        if (!isLoggedIn) {
          router.push('/login')
          dispatch(setAlert({message: 'Please login', type: "alert-error" }))
          setTimeout(() => {
            dispatch(clearAlert());
          }, 3000)
    
        }
      },[isLoggedIn])

    function afterPostJob() {
        router.push('/');
    };

    async function userPostJob(evt) {
        evt.preventDefault();

        const userId = getUserId();

        const jobData = {
            user: userId,
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
            "/api/collections/jobs/records",
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-type': 'application/json',
            },
            body: JSON.stringify(jobData),
            }
        );

        if (resp.status == 200) {
            afterPostJob();
            dispatch(setAlert({message: "Job created successfully", type: "alert-success"}));
            setTimeout(() => {
              dispatch(clearAlert());
            }, 3000)
        } else {
            const res = await resp.json();
            const newFormErrors = res.data; 
            setFormErrors(newFormErrors);
            dispatch(setAlert({message: "Failed to create job", type: "alert-warning"}));
            setTimeout(() => {
              dispatch(clearAlert());
            }, 3000)
        }
    }

    return(

        <div>
            <h1 className="text-center text-3xl font-bold display-flex align-middle">Post a Job</h1>
                <form onSubmit={userPostJob} className="w-full left px-36">
                    <div className="form-control mt-5">
                        <label className="label" htmlFor="title">
                            <span className="label-text">Job Title</span>
                            </label>
                            <input
                            type="text"
                            name="title"
                            placeholder="Please input your job title"
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
                            placeholder="Please input the minimum compensation"
                            className='input input-bordered w-full'
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
                            placeholder="Please input the maximum compensation"
                            className="input input-bordered w-full"
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
                            <span className="label-text">Company Name</span>
                            </label>
                            <input
                            type="text"
                            name="employer"
                            placeholder="Please input your company name"
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
                            placeholder="Please input your job location"
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
                            placeholder="Please input your job description"
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
                            placeholder="Please input your job requirements"
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
                            placeholder="Please input your application instructions"
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
                        <button className="btn text-3xl">POST JOB</button>
                    </div>
                </form>
        </div>
    )
}