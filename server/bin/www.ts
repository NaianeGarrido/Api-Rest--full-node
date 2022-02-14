import app from "../app";
import dns from "dns";
import dnsCache from "dnscache";


try {
  dnsCache({
    enable: true,
    ttl: 300,
    cachesize: 1000,
  });

  app.listen(3000, () => console.log("Server Started"));
} catch (error) {
  console.log(error);
}

