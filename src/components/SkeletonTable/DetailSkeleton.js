import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DetailSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg max-w-4xl px-3 pt-4 py-5 m-4">
            <div className="row row-cols-3 align-items-center gy-3">
                <div className="col">
                    <h5 className="text-nowrap fw-bold"><Skeleton width={100} baseColor="#afafaf" highlightColor="#eeeeee" /></h5>
                    <h6 className="text-nowrap"><Skeleton width={150} baseColor="#afafaf" highlightColor="#eeeeee" /></h6>
                </div>
                <div className="col">
                    <h5 className="text-nowrap fw-bold"><Skeleton width={100} baseColor="#afafaf" highlightColor="#eeeeee" /></h5>
                    <h6 className="text-nowrap"><Skeleton width={150} baseColor="#afafaf" highlightColor="#eeeeee" /></h6>
                </div>
                <div className="col">
                    <h5 className="text-nowrap fw-bold"><Skeleton width={100} baseColor="#afafaf" highlightColor="#eeeeee" /></h5>
                    <h6 className="text-nowrap"><Skeleton width={150} baseColor="#afafaf" highlightColor="#eeeeee" /></h6>
                </div>
                <div className="col">
                    <h5 className="text-nowrap fw-bold"><Skeleton width={100} baseColor="#afafaf" highlightColor="#eeeeee" /></h5>
                    <h6 className="text-nowrap"><Skeleton width={150} baseColor="#afafaf" highlightColor="#eeeeee" /></h6>
                </div>
                <div className="col">
                    <h5 className="text-nowrap fw-bold"><Skeleton width={100} baseColor="#afafaf" highlightColor="#eeeeee" /></h5>
                    <h6 className="text-nowrap"><Skeleton width={150} baseColor="#afafaf" highlightColor="#eeeeee" /></h6>
                </div>
                <div className="col">
                    <h5 className="text-nowrap fw-bold"><Skeleton width={100} baseColor="#afafaf" highlightColor="#eeeeee" /></h5>
                    <h6 className="text-nowrap"><Skeleton width={150} baseColor="#afafaf" highlightColor="#eeeeee" /></h6>
                </div>
                <div className="col">
                    <h5 className="text-nowrap fw-bold"><Skeleton width={100} baseColor="#afafaf" highlightColor="#eeeeee" /></h5>
                    <h6 className="text-nowrap"><Skeleton width={150} baseColor="#afafaf" highlightColor="#eeeeee" /></h6>
                </div>
            </div>
        </div>
    )
}

export default DetailSkeleton
