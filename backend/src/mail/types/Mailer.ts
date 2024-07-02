import Mail from "./Mail";

export default interface Mailer {
  setup(): Promise<void>;
  sendMail(mail: Mail): Promise<void>;
}
