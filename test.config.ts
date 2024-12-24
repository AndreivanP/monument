import * as dotenv from 'dotenv';
dotenv.config();

interface SetUp {
    baseURLStgUI: string;
    baseURLStgAPI: string;
    username: any;
    password: any;
}

export default function (): SetUp {
    const setUp: SetUp = {
        baseURLStgUI: "https://automatedtests.stg.monument.io",
        baseURLStgAPI: "https://api-ext.stg.monument.io",
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    };
    return setUp;
}