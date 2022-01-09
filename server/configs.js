const config = {
  pgPoolConfig: {
    dev: {
      user: "postgres",
      host: "cramm-dev.ckkkxicgnwqj.ap-south-1.rds.amazonaws.com",
      database: "postgres",
      password: "dGZcJwssVhzEU8dygtvA",
      port: 5432
    },
    prod: {
      user: "dbmasteruser",
      host: "ls-571f439c3e265a8ce517086d9e931a5fc3a9a518.c8isgvlubvrj.ap-south-1.rds.amazonaws.com",
      database: "postgres",
      password: "(E>}Fr&Ovb~kVBUsM7fIs*^s9.tV|=Ev",
      port: 5432
    }
  }
}

export default config