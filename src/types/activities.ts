type ActivitiesTypes = "New Resource" | "Modification";

type ActivityBase = {
  activity: ActivitiesTypes;
  activityDate: string;
};

type DatasetActivity = {
  dataset: Dataset;
} & ActivityBase;

type InstructionActivity = {
  instruction: Instruction;
  dataset: Dataset;
} & ActivityBase;

type Activities = {
  datasetsActivities: DatasetActivity[];
  instructionsActivities: InstructionActivity[];
};
