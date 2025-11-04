from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes, edges):
    """Check if the graph is a DAG using DFS to detect cycles."""
    # Create adjacency list
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        graph[edge['source']].append(edge['target'])
    
    # Keep track of visited nodes
    visited = set()
    path = set()
    
    def dfs(node):
        if node in path:
            return False  # Cycle detected
        if node in visited:
            return True
        
        path.add(node)
        visited.add(node)
        
        # Visit all neighbors
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False
        
        path.remove(node)
        return True
    
    # Check all nodes
    for node in graph:
        if node not in visited:
            if not dfs(node):
                return False
    
    return True

@app.get('/')
def read_root():
    return {'status': 'ok'}

@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    
    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': is_dag(nodes, edges)
    }
