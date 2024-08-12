---
id: teams
title: Microsoft Teams
---

> This feature was introduced in _Unleash v4.0.0_.

The Microsoft Teams integration allows Unleash to post updates when a feature flag is updated. To set up this integration, you need to set up a webhook connector for your channel. You can follow [Creating an Incoming Webhook for a channel](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) on how to do that.

The Microsoft Teams integration performs a single retry if the HTTP POST against the Microsoft Teams Webhook URL fails due to a 50x or a network issue. As a result, duplicate events may occur, and you should not assume that events always arrive in order.

## Configuration

#### Events

You can choose to trigger updates for the following events:

- feature-created
- feature-updated (deprecated since Unleash v4.3)
- feature-metadata-updated
- feature-project-change
- feature-archived
- feature-revived
- feature-strategy-update
- feature-strategy-add
- feature-strategy-remove
- feature-stale-on
- feature-stale-off
- feature-environment-enabled
- feature-environment-disabled

#### Parameters

Unleash Microsoft Teams integration takes the following parameters.

- **Microsoft Teams Webhook URL** - This is the only required property.

#### Tags

Microsoft teams's incoming webhooks are channel-specific. You will be able to create multiple integrations to support messaging on multiple channels.
