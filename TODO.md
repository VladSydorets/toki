# Toki Issue Tracker - Development Roadmap

## 🧑‍💼 User Profile & Authentication

### User Profile Page

- [x] Add Personal info editing
  - [x] Add Cancel button functionality (it should clear the form and populate it with the data from DB)
- [x] Changing password functionality
- [x] Extract an error message into a component
- [x] Mobile responsivity
- [x] Add additional confirmation when deleting account (type email to confirm)
- [ ] Media Management
  - [ ] Add avatar uploading/editing
    - [ ] Image cropping functionality
    - [ ] File size validation
    - [ ] Supported formats (JPG, PNG, WebP)
  - [ ] Add profile banner/thumbnail uploading/editing
    - [ ] Recommended dimensions guide
    - [ ] Preview functionality

### Authentication Enhancements

- [ ] Implement "Remember Me" functionality
- [ ] Add multi-factor authentication (needs further planning)
- [ ] Password recovery workflow improvements
- [ ] Session management (view/revoke active sessions)

## 📱 UI/UX Improvements

### Notifications & Feedback

- [ ] Add Toast component system
  - [ ] Success notifications for creating/updating/deleting issues
  - [ ] Error handling with user-friendly messages
  - [ ] Warning notifications for potentially destructive actions
- [ ] Implement real-time notifications for assigned issues (needs further planning)
- [x] Add loading states and skeleton loaders

### Accessibility Improvements

- [ ] Audit and fix keyboard navigation
  - [] Add shortcuts (at least for a menu or editing/removing issues)
- [ ] Improve screen reader compatibility

### Visual Enhancements

- [ ] Add custom color themes for projects
- [ ] Create consistent iconography system
- [ ] Improve motion design system for transitions

## 🎯 Issue Management Features

### Issue Board Enhancements

- [ ] Add drag-and-drop functionality for kanban board
  - [ ] Status updates via drag between columns
  - [ ] Priority updates via vertical positioning
- [ ] Implement quick-edit functionality (needs further planning)
- [ ] Add batch operations (status change, assignment) (needs further planning)

### Issue Details

- [ ] Improve issue details page
  - [ ] Add activity timeline/history
  - [ ] Implement comments/discussion system (needs further planning)
  - [ ] Add file attachments
- [ ] Create issue templates
- [ ] Add custom fields support (needs further planning)

## 📊 Reporting & Analytics

- [ ] Enhance dashboard with additional metrics
  - [ ] Issue distribution by assignee
  - [ ] Burndown charts (needs further planning)
- [ ] Create exportable reports (CSV, PDF)
- [ ] Add customizable dashboard widgets
- [ ] Implement milestone tracking (needs further planning)

## 👥 Team Collaboration

- [ ] Add groups/teams page
  - [ ] Team management UI
  - [ ] Permission management
  - [ ] Team activity feeds
- [ ] Implement @mentions in issue descriptions/comments

## 🚀 Future Enhancements

- [ ] Add demo/get started mode
  - [ ] Interactive tutorial
  - [ ] Sample data generation

## 🛠️ Technical Debt & Infrastructure

- [ ] Improve test coverage
  - [ ] Unit tests for critical components
  - [ ] Integration tests for user flows
  - [ ] End-to-end testing
- [ ] Performance optimization
  - [ ] Optimize database queries
  - [ ] Implement caching strategy
  - [ ] Bundle size optimization
- [ ] Refactor component architecture for better reusability
- [ ] Add GitHub PRs review by AI agent
