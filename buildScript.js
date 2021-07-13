import { execSync } from "child_process"
import fs  from "fs"

const buildFolder = `${process.cwd()}/client/build`

execSync("cd ./client && npm run build")
process.stdout.write("\n************************************************************\n")
process.stdout.write("\n BUILD GENERATION COMPLETION SUCCESSFULLY \n")

const files = fs.readdirSync(buildFolder)
files.forEach((file) => {
  const publicLocation = `${process.cwd()}/public/${file}`
  const safeOperate = (fn) => {
    try {
      fn()
    } catch (err) {
      //no_op
    }
  }
  safeOperate(() => fs.unlinkSync(publicLocation))
  safeOperate(() => fs.rmdirSync(publicLocation, { recursive: true, force: true }))
  fs.renameSync(`${buildFolder}/${file}`, publicLocation)
  process.stdout.write(`\n PROCESSED FILES/DIRS --- ${file} \n`)
})
