SELECT p.*, c.serialNumber AS computerSerialNumber
FROM peripherals p
LEFT JOIN computers c ON c.id = p.computerId
WHERE p.syncId = ?;
