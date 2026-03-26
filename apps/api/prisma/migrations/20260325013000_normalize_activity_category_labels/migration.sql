DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'ActivityCategory'
      AND e.enumlabel = 'WEFA_MEAL'
  ) AND NOT EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'ActivityCategory'
      AND e.enumlabel = 'MINA_MEAL'
  ) THEN
    ALTER TYPE "ActivityCategory" RENAME VALUE 'WEFA_MEAL' TO 'MINA_MEAL';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'ActivityCategory'
      AND e.enumlabel = 'TURKEY_AIDS'
  ) AND NOT EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'ActivityCategory'
      AND e.enumlabel = 'TANZANIA_AIDS'
  ) THEN
    ALTER TYPE "ActivityCategory" RENAME VALUE 'TURKEY_AIDS' TO 'TANZANIA_AIDS';
  END IF;
END $$;
