# Implementation Guide for SiteBuilder MCP Code Server

This guide is specifically for AI agents using the **SiteBuilder MCP Code Server** to build website pages and widgets.

**For complete documentation:**
- Read the `resource://readme` resource from the MCP Code Server for full documentation
- The guide includes all tools, resources, examples, and best practices

---

## Most Important Facts

1. `{{document.field}}` template syntax **ONLY works in HTML widgets** (`isSSR: true`), **NOT in page HTML**
2. Page HTML `<body>` tag must be clean - no attributes or classes
3. Widgets are embedded using `<widget-placeholder data-widget-id="..." site-id="..."></widget-placeholder>` syntax only
4. **The entire `API` object is ONLY available in React widgets** - HTML widgets and page HTML cannot use API calls
5. Never use `<style>` or `<script>` tags in page HTML - use CSS/JS tools instead
6. Widget CSS is globally scoped - use unique class names
7. HTML widgets support `{{document.field}}` template variables for dynamic content
8. React widgets support JavaScript, hooks, and the API object for interactivity
9. Use `edit_page` / `edit_widget` for small, targeted changes instead of replacing entire content

**Remember** Always look up existing sample widgets for reference code before creating your own.

---

## When to Use Widgets

### Best Practice: Use Widgets for Reusable Components

**Always use HTML widgets for:**
- Navigation menus and headers
- Footers and site-wide elements
- Document content display (using `{{document.field}}` template variables)
- Any reusable HTML code that appears across multiple pages
- Static content that benefits from server-side rendering

**Always use React widgets for:**
- Dynamic features requiring user interaction (forms, buttons, tabs)
- Login and authentication interfaces
- Business logic and state management
- Dynamic content that requires API calls or data fetching
- Interactive components that respond to user actions

**Rationale:** Widgets provide reusability, maintainability, and proper separation of concerns. Page HTML should primarily serve as a container structure, with widgets handling the actual content and functionality. This approach ensures consistency across pages and makes updates easier to manage.

---

## Quick Reference

| Feature | Page HTML | HTML Widget | React Widget |
|---------|-----------|-------------|--------------|
| Template Variables (`{{document.field}}`) | No | Yes | No |
| API Object (`API.*`) | No | No | Yes |
| React/JSX | No | No | Yes |
| JavaScript | No | No | Yes |
| HTML | Yes | Yes | Yes |
| Custom CSS | Yes | Yes | Yes |

---

## Edit Tools

For making small, targeted changes to existing pages or widgets, use the **edit tools** instead of replacing the entire content:

- `edit_page` - Find and replace text in page HTML (surgical edit)
- `edit_widget` - Find and replace text in widget code (surgical edit)

These tools require the `old_content` to uniquely match exactly one location. Use `read_page` or `read_widget` first to see the current content.

---

## Widget API for React Widgets

React Widgets always have access to the global `API` object:

- `API.Docs_GetDocumentList(options?)` - Get documents. Options: `{ type?, categoryId?, limit?, startOffset?, contentLength?, includeChildren? }`
- `API.Docs_GetDocument(documentId)` - Get single document by ID
- `API.Docs_SearchDocuments(options)` - AI-powered vector search. Options: `{ query, categoryId?, type?, limit? }`
- `API.Docs_GetCategories()` - Get visible categories
- `API.Site_GetMenuItems()` - Get navigation menu items for the site
- `API.Site_SendEmailToAdmin(subject, message, durationMS?)` - Send email to admin (e.g. for contact forms). `durationMS` is optional for bot detection.
- `API.Chat_Message(message, conversationId?)` - Message the site's built-in AI chat service
- `API.user` - Returns a user object if logged in: `{ uid, email, displayName, photoURL }` or `null` if anonymous

---

## Common Mistakes to Avoid

1. **Using `{{document.field}}` in page HTML** - Move to HTML widget
2. **Adding attributes to `<body>` tag** - Use CSS tools instead
3. **Using `<style>` or `<script>` tags in page HTML** - Use CSS/JS tools
4. **Wrong widget embedding syntax** - Only `<widget-placeholder>` works
5. **Trying to use `API` object in HTML widgets or page HTML** - The API object is ONLY available in React widgets
6. **Replacing entire page HTML for small changes** - Use `edit_page` for targeted edits

---

## For More Information

When using the MCP Code Server:

- **Complete Guide:** Read `resource://readme` from MCP Code Server
- **Available Tools:** Use `tools/list` to see all available MCP tools
- **Resources:** Use `resources/list` to see all available resources
- **Examples:** See the guide for code examples and patterns
- **API Examples:** Read the `test-widget` sample widget via MCP resource `widgets://read/test-widget` to see practical examples of all API methods used in React widgets
