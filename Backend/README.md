Run Backend.sln

In case of certificate error use Powershell commands:
```powershell
dotnet dev-certs https --clean
dotnet dev-certs https -v
```
Q: How to create new migration? <br />
A: Use Console Package Manager, add-migration your-name <br />
Q: How to update DB? <br />
A: In Console Package Manager, update-database <br />
Q: How to come back to previous migration? <br />
A1. update-database name-of-previous-migration <br />
A2. remove-migration <br />

Currently DB is working only on local PC. <br />
Use SSMS with latest SQL version. <br />
Change name of server in appsettings.json to PC's SQL instance.
