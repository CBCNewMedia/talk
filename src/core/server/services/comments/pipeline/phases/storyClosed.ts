import { StoryClosedError } from "coral-server/errors";
import {
  IntermediateModerationPhase,
  IntermediatePhaseResult,
  ModerationPhaseContext,
} from "coral-server/services/comments/pipeline";
import { getStoryClosedAt } from "coral-server/services/stories";

// This phase checks to see if the story being processed is closed or not.
export const storyClosed: IntermediateModerationPhase<
  Pick<ModerationPhaseContext, "story" | "tenant" | "now">
> = ({ story, tenant, now }): IntermediatePhaseResult | void => {
  const closedAt = getStoryClosedAt(tenant, story);
  if (closedAt && closedAt <= now) {
    throw new StoryClosedError();
  }
};
