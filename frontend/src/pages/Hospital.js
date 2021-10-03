import React, { useState, useEffect } from 'react';
import {
    CardWrapper,
    CardHeader,
    CardHeading,
    CardBody,
    CardFieldset,
    CardInput,
    CardButton,
    CardLink
} from "../components/Card";
import axios from 'axios';

var base = 'https://api.odcloud.kr/api/apnmOrg/v1/list?';
var page = 'page=1&';
var perPage = 'perPage=100&';
var apiKey = 'l2B42YXbMbwPze7EVaUikAcFr8mrfMe3y2xA37lXcWQv2mUgAIBm4jc16yHtlsXFVdQ9iYRhrkYGwEfL%2B%2BdrSA%3D%3D'

function Hospitals(){
    const [hospitals, setHospitals] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHospitals = async () => {
            try{
                setError(null);
                setHospitals(null);
                setLoading(true);
                const response = await axios.get(base+page+perPage+'serviceKey='+apiKey);
                setHospitals(response.data.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };
        fetchHospitals();
    }, [])

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!hospitals) return null;

    return (
        <div>
            테스트
            <ul>
                {hospitals.map(hospital => (
                <li key={hospital.orgcd}>
                    {hospital.orgnm} -- 주소 : {hospital.orgZipaddr}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Hospitals;