export interface SymptomsCode {
  SymptomsCode : number[]
}

export enum SymptomCode {
  "Low" = 1, "Medium"  = 2, "High" = 3 , "Critical" = 4,
}

export interface Patient {
  push(patient: Patient): unknown;
 patientID  :string ,
    name :string
    age : number ,
    symptoms : number[]
    arrivalTime : Date ,
    urgency  : "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | number

}
export interface TreatmentRoom {
  roomId: string;
  isAvailable : boolean ;
    currentpatient? : Patient
}
export interface PatientAssignment {
  roomId: string;
  patientID: string;
  
}



export interface Repository<T> {
  adimidPatient(data: Partial<T>): Promise<T>;
  dischargPatient(data: Partial<string>): Promise<boolean | null | undefined>;
  getRoomStatus(): Promise<{ freeRooms: number; occupiedRooms: number }>;
  getQueeStatus(): Promise<T[]>;

  // getById(id: string): Promise<T | null>;
  // getAll(): Promise<T[]>;
  // create(data: Partial<T>): Promise<T>;
  // update(id: string, data: Partial<T>): Promise<T | null>;
  // delete(id: string): Promise<boolean>;
}
