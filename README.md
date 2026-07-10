# MCP Coding Server Template

This template contains pre-configured files to connect your AI coding tools (Claude Code, Cursor, etc.) to your site's Coding MCP Server.

## Installation

1. **Copy files to your project directory:**
   - Extract this ZIP file to your project root
   - The files `.mcp.json` and `.claude/settings.local.json` should be at the root of your project

2. **Restart your AI tool:**
   - For Claude Code: Restart VS Code or reload the window
   - For Cursor: Restart Cursor

3. **Verify connection:**
   - The MCP server "sitebuilder-mcp-coding" should now appear in your AI tool
   - You can start using MCP resources and tools immediately

## Files Included

- `.mcp.json` - Main MCP configuration with server URL and authentication
- `.claude/settings.local.json` - Claude-specific settings with pre-approved permissions
- `.cursor/mcp.json` - Cursor configuration (currently minimal)

## What You Can Do


### Coding Server Features

**Resources:**
- Read site data (CSS, JS, metadata)
- Read page data (HTML, CSS)
- List and read widgets
- Access getting started guide

**Tools:**
- Update site CSS and JavaScript
- Create, edit, and delete pages
- Create, edit, and delete custom widgets (React or HTML)
- Modify page HTML, CSS, and metadata


## Security

- The API key in this configuration is specific to your site
- Keep these files secure and do not commit them to version control
- Add `.mcp.json` and `.claude/` to your `.gitignore`

## Support

For more information, visit the MCP settings page in your site admin panel.
