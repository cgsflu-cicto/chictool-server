INSERT INTO peripherals (
  syncId, computerId, type, manufacturer, model, serialNumber, assetTag,
  assignedUser, remarks
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
  computerId = VALUES(computerId),
  type = VALUES(type),
  manufacturer = VALUES(manufacturer),
  model = VALUES(model),
  serialNumber = VALUES(serialNumber),
  assetTag = VALUES(assetTag),
  assignedUser = VALUES(assignedUser),
  remarks = VALUES(remarks),
  deletedAt = NULL;
