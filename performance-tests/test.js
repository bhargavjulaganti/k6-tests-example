import http from "k6/http";
import {check} from "k6";


const binFile = open("input.csv", "b");

export const options = {
    thresholds: {
        http_req_failed: ["rate<0.01"], // http errors should be less than 1%
        http_req_duration: ["p(99)<1000"] // 99% of requests should be less than 1s
    },
    scenarios: {
        uploadFile: { // 30 iterations per second for 5 seconds : read more at here : https://k6.io/docs/using-k6/scenarios/executors/constant-arrival-rate/
            executor: 'constant-arrival-rate',
            preAllocatedVUs : 10,
            duration: "5s",
            rate: 30,
            timeUnit: '1s'
        }
    }
}


export default function uploadFileBinary() {
    var data = {
        field: "this is standard file",
        file: http.file(binFile, "test.bin")
    }

    let response = http.post("http://localhost:5258/api/file/uploadbinaryfile", data);

    check(response, { "status was 200": (r) => r.status === 200});
}