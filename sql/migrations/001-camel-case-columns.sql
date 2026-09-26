-- Run once against databases created with the earlier snake_case schema.
ALTER TABLE computers
  RENAME COLUMN serial_number TO serialNumber,
  RENAME COLUMN serial_override TO serialOverride,
  RENAME COLUMN operating_system TO operatingSystem,
  RENAME COLUMN mac_address TO macAddress,
  RENAME COLUMN machine_type TO machineType,
  RENAME COLUMN acquired_on TO acquiredOn,
  RENAME COLUMN par_holder TO parHolder,
  RENAME COLUMN primary_user TO primaryUser,
  RENAME COLUMN collected_on TO collectedOn,
  RENAME COLUMN script_version TO scriptVersion,
  RENAME COLUMN created_at TO createdAt,
  RENAME COLUMN updated_at TO updatedAt;

ALTER TABLE peripherals
  RENAME COLUMN sync_id TO syncId,
  RENAME COLUMN computer_id TO computerId,
  RENAME COLUMN serial_number TO serialNumber,
  RENAME COLUMN asset_tag TO assetTag,
  RENAME COLUMN assigned_user TO assignedUser,
  RENAME COLUMN deleted_at TO deletedAt,
  RENAME COLUMN created_at TO createdAt,
  RENAME COLUMN updated_at TO updatedAt;
