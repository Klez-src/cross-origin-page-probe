# Cross-Origin Page Probe

A little POC for figuring out stuff about a cross-origin page without being able to directly read it.

I was messing around with browser security and ended up wondering:

> **Can a website figure out something about another website without actually being allowed to read it?**

So this repo is basically me testing that.

## What this is

The idea is to have one page try to detect some kind of state on another page that lives on a different origin.

Normally, the browser's same-origin policy stops you from doing things like:

```js
fetch("https://example.com")
```

and then just reading whatever comes back.

That's obviously a good thing.

But browsers have loads of other ways of loading resources, embedding pages, caching things, navigating around, etc.

So the question is whether any of those behaviours accidentally give us a way to **infer something** about the other page.

## The goal

This isn't meant to be a full exploit or anything.

I'm mainly interested in:

* what information can actually be inferred
* what browser behaviour makes it possible
* whether it works consistently
* which browsers prevent it
* and what the actual limitations are

If it turns out the idea doesn't work, that's fine too. The point is figuring out what the browser actually lets us do.

## Setup

Clone the repo:

```bash
git clone https://github.com/Klez-src/cross-origin-page-probe.git
cd cross-origin-page-probe
```

Then run it locally however you normally serve static files.

For example:

```bash
npx serve .
```

You'll need two different origins for the experiment, since the whole point is testing cross-origin behaviour.

## Disclaimer

This is a security research / browser behaviour PoC.

Only use it against pages and systems you own or have permission to test.

## Why?

Mostly because I thought it was a weird idea and wanted to see if it actually worked.

That's pretty much it.
