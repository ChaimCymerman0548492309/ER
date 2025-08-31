import fs from "fs/promises";
import path from "path";
import {
  Patient,
  PatientAssignment,
  Repository,
  TreatmentRoom,
} from "./types/types";

const DATA_FILE = path.join(__dirname, "data.json");

export class JsonRepository
  implements Repository<boolean | Patient | PatientAssignment | null>
{

    private async load(): Promise<TreatmentRoom[]> {
    try {
      const raw = await fs.readFile(DATA_FILE, "utf-8");
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private async save(data: TreatmentRoom[]): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }


  async adimidPatient(patient: Partial<Patient>): Promise<PatientAssignment | null>  {
    const all = await this.load();
    const index = all.findIndex((i) => i.isAvailable );
    if (index === -1) return null;
    all[index] = {
      ...all[index],
      isAvailable : false ,
      currentpatient: patient as Patient,
    };
    await this.save(all);
    return { roomId : all[index].roomId  , patientID : patient.patientID! } ;

  }
   async dischargPatient(
    patientID: string
  ): Promise<boolean | null | undefined> {
    console.log("🚀 ~ JsonRepository ~ dischargPatient ~ patientID:", patientID)
   
        const all = await this.load();
        const index = all.findIndex((i) => i.currentpatient?.patientID === patientID);
        console.log("🚀 ~ JsonRepository ~ dischargPatient ~ index:", index)
        if (index === -1) return null;
      
      all[index] = {
      ...all[index],
      isAvailable : true ,
      currentpatient: undefined,
    };
    await this.save(all);
          return true;
      }

async getRoomStatus(): Promise<{ freeRooms: number; occupiedRooms: number }> {
  let freeRooms = 0;
  let occupiedRooms = 0;
  const data = await this.load();
  data.forEach(room => {
    if (room.isAvailable) {
      freeRooms += 1;
    } else {
      occupiedRooms += 1;
    }
  });
  return { freeRooms, occupiedRooms };
}
async  getQueeStatus(): Promise<(boolean | Patient | PatientAssignment)[]> {
    throw new Error("Method not implemented.");
  }

}