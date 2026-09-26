INSERT INTO computers (
  serialNumber, serialOverride, manufacturer, model, operatingSystem,
  processor, storage, memory, gpu, macAddress, details, hostname, username,
  machineType, acquiredOn, office, parHolder, primaryUser, remarks,
  collectedOn, scriptVersion
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
  serialOverride = VALUES(serialOverride),
  manufacturer = VALUES(manufacturer),
  model = VALUES(model),
  operatingSystem = VALUES(operatingSystem),
  processor = VALUES(processor),
  storage = VALUES(storage),
  memory = VALUES(memory),
  gpu = VALUES(gpu),
  macAddress = VALUES(macAddress),
  details = VALUES(details),
  hostname = VALUES(hostname),
  username = VALUES(username),
  machineType = VALUES(machineType),
  acquiredOn = VALUES(acquiredOn),
  office = VALUES(office),
  parHolder = VALUES(parHolder),
  primaryUser = VALUES(primaryUser),
  remarks = VALUES(remarks),
  collectedOn = VALUES(collectedOn),
  scriptVersion = VALUES(scriptVersion);
