import axiosCustomerConfig from "@/libs/configs/ApiConfig/axiosCustomerConfig";


const getLastStudyLesion = async () => {
    const response = await axiosCustomerConfig.get("/course/get-last-lesson");
    return response;
}


export {
    getLastStudyLesion
}