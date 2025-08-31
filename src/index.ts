// src/server.ts
import express from "express";
// import { Allocator,  } from "./allocator";
// import { VehicleKind, Car, Floor, SpotSize } from "./types/types";
import router from "./router";

const app = express();
const port = 3000;

app.use(express.json());

// const floors = [
//   {
//     id: "floor1",
//     spots: [
//       { id: "f1s1", size: SpotSize.MOTORCYCLE },
//       { id: "f1s2", size: SpotSize.COMPACT },
//       { id: "f1s3", size: SpotSize.LARGE },
//     ],
//   },
//   {
//     id: "floor2",
//     spots: [
//       { id: "f2s1", size: SpotSize.COMPACT },
//       { id: "f2s2", size: SpotSize.LARGE },
//     ],
//   },
// ];

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// why to use a database of MongoDB and not a SQL database?

// folre :[
//   id :
//   name 
// ]

// spot :[
//   floreID
//   id 
//   size 
//   occupieByCarID
// ]


// car : [
//   id 
//   kind

// ]

// SELECT * FROM spot WHRE occupieByCarID IS NULL AND size = 'LARGE' LIMIT 1;