UPDATE peripherals SET deletedAt = CURRENT_TIMESTAMP(3) WHERE syncId = ?;
