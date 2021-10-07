import React,{useState,useEffect} from "react"
import {
    CardWrapper,
    CardHeader,
    CardHeading,
    CardBody,
    CardFieldset,
    CardInput,
    CardTitle,
    CardSelect,
    CardSelectOption,
} from "../components/Card";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';


const Home = ({history}) => {
    var [selSido, setSelSido] = useState("강원도");
    var [selSi, setSelSi] = useState("");

    var [sido, setSido] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4000/hospitalSido")
        .then(({ data }) => setSido(data))
    },[]);

    var [si, setSi] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4000/hospitalSi",{params: {sido:selSido}})
        .then(({ data }) =>setSi(data))
    },[selSido]);
    

    var [offset, setOffset] = useState(0);
    var [hostpitals, setHospitals] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4000/hospitalList",{params: {offset:offset}})
        .then(({ data }) =>{
            setHospitals(data)
            setOffset(hostpitals.length)
        })
    },[]);
    const next = () =>{
        axios.get("http://localhost:4000/hospitalList",{params: {offset:offset}})
        .then(({ data }) =>{
            setHospitals(prevState => (
                [...prevState, ...data]
            ))
            setOffset(hostpitals.length)
        })
    }

    return (
        <div>
            <CardWrapper
                style={{
                    width:"500px"
                }}
            >
                <CardHeader>
                    <CardHeading>의료기관 조회</CardHeading>
                </CardHeader>

                <CardBody>
                    <CardFieldset>
                        <CardTitle>병원명</CardTitle>
                        <CardInput placeholder="병원명을 입력해주세요" type="text" />
                    </CardFieldset>

                    <CardFieldset>
                        <CardTitle>시/도</CardTitle>
                            <CardSelect defaultValue="강원도" onChange={(e) => setSelSido(e.target.value)}>
                                {sido.map((item)=>{return <CardSelectOption value = {item.sido}>{item.sido}</CardSelectOption>})}
                            </CardSelect>
                    </CardFieldset>


                    <CardFieldset>
                        <CardTitle>시/구</CardTitle>
                            <CardSelect onChange={(e) => setSelSi(e.target.value)}>
                                {si.map((item)=>{return <CardSelectOption value = {item.si}>{item.si}</CardSelectOption>})}
                            </CardSelect>
                    </CardFieldset>
                </CardBody>
            </CardWrapper>

            <CardWrapper style={{
                padding : "0 0 0px",
                width:"500px"
            }}>
                <CardBody>
                    <CardFieldset>
                        <CardTitle>총 개 검색</CardTitle>
                    </CardFieldset>
                </CardBody>

                <InfiniteScroll
                    height="350px"
                    dataLength={hostpitals.length} //This is important field to render the next data
                    next={next}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    }
                    >
                    {
                        hostpitals.map((item)=>{return <div>{item.orgnm}</div>})
                    }
                </InfiniteScroll>
            </CardWrapper>
        </div>
    );
};

export default Home;