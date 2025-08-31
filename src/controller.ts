import { Request, Response } from "express";
import { JsonRepository } from "./repository";
import { Patient } from "./types/types.js";

export class ItemController {
  private repo: JsonRepository;
  // private repo: JsonRepository;
  private PatientQueue: Patient[] = [];

  constructor(repo: JsonRepository) {
    this.repo = repo;
  }
  // adimidPatient	{patient :Patient}	{patientAssignment : PatientAssignment}
  // POST	/dischargPatient	{patientID : string}	{massege : boolean}
  // GET	/getRoomStatus		{freeRooms : number , occupiedRooms : number }
  // GET	/getQueeStatus

  adimidPatient = async (req: Request, res: Response) => {
    try {
      const urgency = Math.max(req.body.symptoms);

      if (urgency >= 3) {
        this.PatientQueue.unshift(req.body);
      } else {
        this.PatientQueue.push(req.body);
      }
      let RoomsAvailable = 0;
      console.log("🚀 ~ ItemController ~ RoomsAvailable:", RoomsAvailable);
      // if (RoomsAvailable > 0) {
      const checkRoomsAvailable = await this.repo.getRoomStatus();
      RoomsAvailable = checkRoomsAvailable.freeRooms;
      // if (RoomsAvailable > 0) {
      const patientAssignment = await this.repo.adimidPatient(
        this.PatientQueue[0] 
      );
      if (!patientAssignment || patientAssignment.patientID !== req.body.patientID ) {

        return res.status(404).json({ error: "No available treatment rooms Patient is in the queue" });
      }
      this.PatientQueue.splice(0, 1);
      
      res.status(201).json(patientAssignment);
      // }
      // }
    } catch {
      res.status(500).json({ error: "Failed to admit patient" });
    }
  };
  dischargPatient = async (req: Request, res: Response) => {
    try {
      const isPatientdischarg = await this.repo.dischargPatient(
        req.body.patientID
      );

      if (!isPatientdischarg)
        return res
          .status(404)
          .json({ error: "error discharg Patient no patient fuond" });
      res.status(201).json(isPatientdischarg);
      // }
      // }
    } catch {
      res.status(500).json({ error: "Failed to admit patient" });
    }
  };
  getQueeStatus = async (req: Request, res: Response) => {
    try {
      let low = 0;
      let medium = 0;
      let high = 0;

      this.PatientQueue.forEach((patient) => {
        console.log("🚀 ~ ItemController ~ patient:", patient);
        // const urgency = Math.max(patient.symptoms);
        // if (urgency === 1) low += 1;
        // else if (urgency === 2) medium += 1;
        // else if (urgency >= 3) high += 1;
      });
      const queeStatus = { low, medium, high };
      if (!queeStatus)
        return res
          .status(404)
          .json({ error: "error discharg Patient no patient fuond" });
      res.status(201).json(queeStatus);
      // }
      // }
    } catch {
      res.status(500).json({ error: "Failed to admit patient" });
    }
  };
  getRoomStatus = async (req: Request, res: Response) => {
    try {
      const isPatientdischarg = await this.repo
        .getRoomStatus
        // req.body as Partial<string>
        ();

      if (!isPatientdischarg)
        return res
          .status(404)
          .json({ error: "error discharg Patient no patient fuond" });
      res.status(201).json(isPatientdischarg);
      // }
      // }
    } catch {
      res.status(500).json({ error: "Failed to admit patient" });
    }
  };
  // getRoomStatus
  // getQueeStatus

  // create = async (req: Request, res: Response) => {
  //   try {
  //     const newItem = await this.repo.create(req.body as Partial<Item>);
  //     res.status(201).json(newItem);
  //   } catch {
  //     res.status(500).json({ error: "Failed to create item" });
  //   }
  // };

  // getAll = async (req: Request, res: Response) => {
  //   try {
  //     const items = await this.repo.getAll();
  //     res.json(items);
  //   } catch {
  //     res.status(500).json({ error: "Failed to load items" });
  //   }
  // };

  // getById = async (req: Request, res: Response) => {
  //   try {
  //     const item = await this.repo.getById(req.params.id);
  //     if (!item) return res.status(404).json({ error: "Item not found" });
  //     res.json(item);
  //   } catch {
  //     res.status(500).json({ error: "Failed to load item" });
  //   }
  // };

  // update = async (req: Request, res: Response) => {
  //   try {
  //     const updated = await this.repo.update(req.params.id, req.body);
  //     if (!updated) return res.status(404).json({ error: "Item not found" });
  //     res.json(updated);
  //   } catch {
  //     res.status(500).json({ error: "Failed to update item" });
  //   }
  // };

  // delete = async (req: Request, res: Response) => {
  //   try {
  //     const ok = await this.repo.delete(req.params.id);
  //     if (!ok) return res.status(404).json({ error: "Item not found" });
  //     res.json({ status: "ok" });
  //   } catch {
  //     res.status(500).json({ error: "Failed to delete item" });
  //   }
  // };
}
