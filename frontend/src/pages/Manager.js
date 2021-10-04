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
import Swal from 'sweetalert2'

const manager = async() => {
    var hospitalInfo = []
    for(var page=1; page<17; page++) {
        var base = 'https://api.odcloud.kr/api/apnmOrg/v1/list?';
        var perPage = '&perPage=1000&';
        var apiKey = 'l2B42YXbMbwPze7EVaUikAcFr8mrfMe3y2xA37lXcWQv2mUgAIBm4jc16yHtlsXFVdQ9iYRhrkYGwEfL%2B%2BdrSA%3D%3D'
        const response = await axios.get(base+'page='+page+perPage+'serviceKey='+apiKey);  
        response.data.data.map((v) => {
            hospitalInfo.push(v);
        });
    }
    const res = await axios.post('http://localhost:4000/manager', {
        hospitalInfo: hospitalInfo,
    })
    return res.data;
}

const Manager = () => {
    return (
        <div>
            <CardButton type="button" onClick={manager}>병원정보 DB 업로드</CardButton>
        </div>
    );
};

export default Manager;