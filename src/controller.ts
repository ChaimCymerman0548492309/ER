import { Request, Response } from "express";
import { JsonRepository } from "./repository";
import { Patient } from "./types/types.js";

export class ItemController {
  private repo: JsonRepository;
  private PatientQueue: Patient[] = [];

  constructor(repo: JsonRepository) {
    this.repo = repo;
  }

  adimidPatient = async (req: Request, res: Response) => {
    try {
      const urgency = Math.max(req.body.symptoms);

      if (urgency >= 3) {
        this.PatientQueue.unshift(req.body);
      } else {
        this.PatientQueue.push(req.body);
      }
      let RoomsAvailable = 0;
      const checkRoomsAvailable = await this.repo.getRoomStatus();
      RoomsAvailable = checkRoomsAvailable.freeRooms;
      const patientAssignment = await this.repo.adimidPatient(
        this.PatientQueue[0]
      );
      if (
        !patientAssignment ||
        patientAssignment.patientID !== req.body.patientID
      ) {
        return res.status(404).json({
          error: "No available treatment rooms Patient is in the queue",
        });
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
    } catch {
      res.status(500).json({ error: "Failed to admit patient" });
    }
  };
  getQueeStatus = async (req: Request, res: Response) => {
    try {
      let low = 0;
      let medium = 0;
      let high = 0;
      console.log(
        "🚀 ~ ItemController ~ this.PatientQueue:",
        this.PatientQueue
      );

      this.PatientQueue.forEach((patient) => {
        console.log("🚀 ~ ItemController ~ patient:", patient);
        const urgency = Math.max(...(patient.symptoms as number[]));
        if (urgency === 1) low += 1;
        else if (urgency === 2) medium += 1;
        else if (urgency >= 3) high += 1;
      });
      const queeStatus = { low, medium, high };
      if (!queeStatus)
        return res
          .status(404)
          .json({ error: "error discharg Patient no patient fuond" });
      res.status(201).json(queeStatus);
    } catch {
      res.status(500).json({ error: "Failed to admit patient" });
    }
  };
  getRoomStatus = async (req: Request, res: Response) => {
    try {
      const isPatientdischarg = await this.repo.getRoomStatus();

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
}
