import React from "react";

import {
  createEventBusHook,
  EventBusTopics,
} from "@moodys/mdc-frontend.utils.event-bus";

export const useEventBus = createEventBusHook<EventBusTopics>(React);
