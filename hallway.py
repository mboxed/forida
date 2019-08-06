from datetime import datetime, timezone

msg = input("Message: ")
tz = "{:%z}".format(datetime.now(timezone.utc).astimezone())
tz = tz[:-2] + ":" + tz[-2:]
dt = "{:%Y-%m-%dT%H:%M:%S}".format(datetime.now(timezone.utc))
timestamp = dt + tz
with open("tw.txt", "rt+") as f:
    s = timestamp + "   " + msg + "\n" + f.read()
    f.seek(0)
    f.truncate()
    f.write(s)