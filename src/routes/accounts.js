import express, { response } from "express";
import { validator } from "../middleware/validation.js";
import { schemaAccount, schemaGetAccount } from "../validation/schemas.js";
import accountService from "../service/AccountsService.js";
import accountingPathes from "../paths/accountsPathes.js";
import { auth } from "../middleware/auth.js";
const accountsRoute = express.Router();
accountsRoute.use(auth(accountingPathes));
accountsRoute.post("/admin", validator(schemaAccount), (req, res) => {
  accountService.addAdminAccount(req.body);
  res.status(201).send("account added");
});
accountsRoute.post("/user", validator(schemaAccount), (req, res) => {
  accountService.addUserAccount(req.body);
  res.status(201).send("account added");
});
accountsRoute.put("/", validator(schemaAccount), (req, res) => {
  accountService.updateAccount(req.body);
  res.send("account updated");
});
accountsRoute.get("/", validator(schemaGetAccount), (req, res) => {
  const account = accountService.getAccount(req.body.email);
  res.send(account);
});
accountsRoute.post("/login", (req, res) => {
  const token = accountService.login(req.body);
  res.send(token);
});
accountsRoute.delete("/", validator(schemaGetAccount), (req, res) => {
  accountService.delete(req.body.email);
  res.send("deleted");
});
export default accountsRoute;
