#!/usr/bin/env python3
"""
Fetch comprehensive PR review data using GitHub CLI.
Returns JSON with all reviews, comments, and file changes.
"""

import subprocess
import json
import sys

def fetch_pr_data(pr_url):
    """
    Fetch PR data including reviews, comments, commits, and changed files.
    
    Args:
        pr_url: Full GitHub PR URL (e.g., https://github.com/owner/repo/pull/123)
    
    Returns:
        dict: Comprehensive PR data including reviews and comments
    """
    
    # GraphQL query to fetch all PR data including review comments
    query = '''
    query($owner: String!, $repo: String!, $number: Int!) {
      repository(owner: $owner, name: $repo) {
        pullRequest(number: $number) {
          title
          body
          state
          additions
          deletions
          changedFiles
          commits(last: 100) {
            nodes {
              commit {
                oid
                messageHeadline
                messageBody
                authoredDate
                committedDate
                authors(first: 10) {
                  nodes {
                    name
                    email
                    user {
                      login
                      id
                    }
                  }
                }
              }
            }
          }
          comments(first: 100) {
            nodes {
              id
              author {
                login
              }
              authorAssociation
              body
              createdAt
              includesCreatedEdit
              isMinimized
              minimizedReason
              reactionGroups {
                content
                users {
                  totalCount
                }
              }
              url
              viewerDidAuthor
            }
          }
          reviews(first: 100) {
            nodes {
              id
              author {
                login
              }
              authorAssociation
              body
              submittedAt
              includesCreatedEdit
              reactionGroups {
                content
                users {
                  totalCount
                }
              }
              state
              commit {
                oid
              }
              comments(first: 100) {
                nodes {
                  id
                  author {
                    login
                  }
                  body
                  createdAt
                  path
                  position
                  originalPosition
                  diffHunk
                  reactionGroups {
                    content
                    users {
                      totalCount
                    }
                  }
                  url
                }
              }
            }
          }
        }
      }
    }
    '''
    
    # Parse PR URL to extract owner, repo, and PR number
    parts = pr_url.rstrip('/').split('/')
    if 'github.com' not in pr_url or 'pull' not in parts:
        raise ValueError(f"Invalid PR URL format: {pr_url}")
    
    try:
        owner = parts[parts.index('github.com') + 1]
        repo = parts[parts.index('github.com') + 2]
        pr_number = int(parts[parts.index('pull') + 1])
    except (IndexError, ValueError) as e:
        raise ValueError(f"Could not parse PR URL: {pr_url}. Error: {e}")
    
    # Execute GraphQL query using gh CLI
    cmd = [
        'gh', 'api', 'graphql',
        '-f', f'owner={owner}',
        '-f', f'repo={repo}',
        '-F', f'number={pr_number}',
        '-f', f'query={query}'
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        data = json.loads(result.stdout)
        
        # Transform to match expected format
        pr_data = data['data']['repository']['pullRequest']
        
        # Flatten commits structure
        pr_data['commits'] = [
            {
                'oid': node['commit']['oid'],
                'messageHeadline': node['commit']['messageHeadline'],
                'messageBody': node['commit']['messageBody'],
                'authoredDate': node['commit']['authoredDate'],
                'committedDate': node['commit']['committedDate'],
                'authors': [
                    {
                        'name': author['name'],
                        'email': author['email'],
                        'login': author['user']['login'] if author.get('user') else None,
                        'id': author['user']['id'] if author.get('user') else None
                    }
                    for author in node['commit']['authors']['nodes']
                ]
            }
            for node in pr_data['commits']['nodes']
        ]
        
        # Flatten comments structure
        pr_data['comments'] = [node for node in pr_data['comments']['nodes']]
        
        # Flatten reviews structure and include review comments
        pr_data['reviews'] = [
            {
                **{k: v for k, v in node.items() if k != 'comments'},
                'comments': [comment for comment in node['comments']['nodes']]
            }
            for node in pr_data['reviews']['nodes']
        ]
        
        return pr_data
        
    except subprocess.CalledProcessError as e:
        print(f"Error executing gh CLI: {e.stderr}", file=sys.stderr)
        raise
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON response: {e}", file=sys.stderr)
        raise

def main():
    if len(sys.argv) < 2:
        print("Usage: fetch_pr_data.py <PR_URL>", file=sys.stderr)
        sys.exit(1)
    
    pr_url = sys.argv[1]
    pr_data = fetch_pr_data(pr_url)
    print(json.dumps(pr_data, indent=2))

if __name__ == "__main__":
    main()
