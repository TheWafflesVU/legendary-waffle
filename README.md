# Waffle 2.0

Welcome to Waffle! Waffle is a platform designed to help software developers establish collaboration. It allows users to post their projects with tags and descriptions, search for other projects, and chat with fellow developers.

## Table of Contents
1. [Deployment](#deployment)
2. [What's New in Waffle 2.0](#whats-new-in-waffle-20)
3. [Performance Improvements](#performance-improvements)
4. [Contribution](#contribution)

## Deployment

Waffle is fully deployed on Render.com!

[Deployed Link](https://legendary-waffle-77sn.onrender.com/)

## What's New in Waffle 2.0

### Features
- **Chatroom Integration**: Users can now create chat rooms for each project, allowing real-time collaboration and discussion.
- **Tag Management**: Improved tag management with a dropdown menu for selecting tags and a separate endpoint for adding tags.
- **Enhanced Project Posting**: Redesigned the project posting page to display existing projects on the left and a form for creating new projects on the right.
- **User Profile Management**: Added a user profile page where users can update their information and select their programming languages with styled checkboxes.
- **Card Interface Update**: Polished displaying of the projects with React-Tinder-Card. Animations now feel much smoother and more responsive.

### Bug Fixes
- Fixed issues with card references in the project card component.
- Fixed error on profile page.
- Resolved scrolling issues with the project card page.
- Improved error handling for API requests.

## Performance Improvements

We have significantly optimized the performance of Waffle, resulting in faster load times and a reduction in the size of the JavaScript and CSS bundles.

### Previous Version (Waffle 1.0)
- **JavaScript**: 231.79 kB `build/static/js/main.b069bcf5.js`
- **CSS**: 7.15 kB `build/static/css/main.cca800e1.css`

### Current Version (Waffle 2.0)
- **JavaScript**: 138.17 kB `build/static/js/main.582cf7c3.js`
- **CSS**: 2.49 kB `build/static/css/main.33a008ca.css`

These optimizations were achieved through effective use of tree shaking, code splitting, and removal of unused dependencies.

## Contribution

We welcome contributions to Waffle! If you have any ideas, bug fixes, or enhancements, feel free to fork the repository and submit a pull request. Please make sure to follow our [contribution guidelines](#).

If you have any questions or need further assistance, please contact our support team at [support@waffle.com](mailto:support@waffle.com).

---

Thank you for using Waffle! We hope you enjoy the new features and improvements in version 2.0.
