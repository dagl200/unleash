---
title: A/B and multivariate testing
---
import VideoContent from '@site/src/components/VideoContent.jsx'

A/B testing is a type of randomized controlled experiment where you test two different versions of a feature to see which performs better. When testing more than two versions, it’s called _multivariate testing_. Coupled with analytics, A/B and multivariate testing help you gain deeper insights into your users and how you can serve them better.

To facilitate A/B testing and experimentation, Unleash has a built-in 'experiment' [flag type](../reference/feature-toggle-types.md#feature-toggle-types) and lets you give flags any number of [variants](../reference/feature-toggle-variants.md). To see a concrete example of configuring multivariate testing with Unleash, see [our blog post on A/B testing with Unleash and Google Analytics](https://www.getunleash.io/blog/a-b-n-experiments-in-3-simple-steps).

In the rest of this document, _A/B testing_ will refer to both strict A/B testing and multivariate testing unless otherwise specified.

<VideoContent videoUrls={["https://www.youtube.com/embed/bxYdeMb9ffw?si=XSnKk74HbZg3puXO"]}/>


## What is A/B testing?

A/B testing is a user experience research methodology used to compare two versions of a digital product to determine which performs better. It’s effective for understanding user engagement, behavior, and satisfaction. 

You’ve likely encountered numerous A/B tests, whether you realized it or not. Large social media platforms often use A/B testing to streamline and enhance user experiences, so if you use any of them, you’ve almost certainly been part of one. News websites frequently test different headlines for the same story to see which generates the most engagement, while e-commerce sites use A/B tests in their purchase funnels to understand and reduce user drop-off. A/B testing is everywhere, and, more importantly, it works.

In a nutshell, if you're attempting to grow your customer base or improve your user experience, you will benefit from running experiments, and A/B testing is a fantastic way to get measurable results that point you in the right direction.

For some concrete examples of businesses that have used A/B testing to improve their outcomes, see [Crazy Egg's case study](https://www.crazyegg.com/blog/ab-testing-examples/) or [VWO's list of noteworthy examples](https://vwo.com/blog/ab-testing-examples/).

## How to do A/B testing?

First, you’ll need a measurable outcome. You also need to be able to correlate the data you collect with the specific group the user belongs to.

For example, imagine you run a website where people can access content with or without a membership. You’re looking to improve the conversion rate and increase the number of members on the site. This gives us a measurable outcome: the percentage of new sign-ups relative to the total number of users in the group. To correlate the data, you’ll likely use a front-end analytics tool to track the number of users and how they interact with the site.

In this example, Group A serves as the control group—they won’t see any changes. Group B, the treatment group, will see a version of the website with a change that you believe will impact the number of sign-ups, such as a larger, more prominent sign-up button.

The duration of the experiment depends on your specific use case, but it should run long enough to gather sufficient data to identify any clear trends. If more users in the treatment group sign up for a membership, you’ll know the changes had the intended effect. If there’s no change or a negative effect, you’ll know the changes didn’t work as intended.

The simplest A/B experiments use a control group and a single treatment group, but that’s not always the best approach. For example, if you’re launching a new feature, there won’t be a control group with 'no change.' In this case, the question remains the same—does A or B perform better?—but without a control group. You might also want to test multiple variations, with or without a control group. The key principles remain the same: define a measurable goal and determine which variant performs better.

### Potential pitfalls

A thing to keep in mind when running experiments like this or in other cases where you're optimizing for a single metric is whether this is damaging to certain other metrics. Do more sign-ups also lead to more people (relatively) canceling their membership? Does it decrease engagement with other parts of your product?

Don't do yourself a disservice by chasing one metric above all else. Keep an eye on other metrics at the same time and see if they are affected — always maintain a holistic view of things.


## A/B testing with Unleash

Feature flags are a great way to run A/B tests while keeping them separate from your code. Unleash comes with built-in features that make it easy to get started.

Flags can be used for different purposes and we consider experimentation important enough to have given it its own [flag type](../reference/feature-toggle-types.md#feature-toggle-types). Experiment flags have a lifetime expectancy suited to let you run an experiment and gather enough data to know whether it was a success or not.

If you're running a basic A/B test where the control group doesn't see any change, then a basic experiment flag will do the job excellently. With a [gradual rollout](../reference/activation-strategies#gradual-rollout), some appropriate [strategy constraints](../reference/strategy-constraints.md), and an analytics tool of your choosing, you should be all set to start collecting metrics and measuring.

If you want to run a more advanced experiment, then take a look at using [feature flag variants](../reference/feature-toggle-variants). If you have a control group and want to test multiple potential improvements, then simply add your desired variants to the flag as discussed in the previous paragraph. If you want to launch a new feature (or a headline) in multiple variations right out the gate, consider using a basic on/off flag with variants and activate it for all your users.

### Impression data

[Impression data](../reference/impression-data.md) is an Unleash feature that was released in Unleash 4.7.
It allows you to capture events whenever a feature flag is checked in your applications.
The event contains all the information about the flag and the current context, so you can pass everything to your third-party analytics provider, such as [Google Analytics](https://analytics.google.com/analytics) or [Posthog](https://posthog.com/).
This makes Unleash even more useful as an A/B testing tool and makes it much easier to correlate events and variants with feature flags and Unleash context.


## Summary

A/B testing allows you to run experiments on your users and improve your product by using real, proven metrics. It's used by some of the world's most successful businesses to stay ahead of competitors. At Unleash, we've integrated tools to make A/B testing easy and accessible from the start, ensuring you can optimize your product smoothly and effectively.

So what are you waiting for? Find out what you want to improve next and get testing!
