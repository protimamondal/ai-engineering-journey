FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim

WORKDIR /app

# Install deps first, separately from app code, so Docker caches this layer
# and only re-runs `uv sync` when pyproject.toml/uv.lock actually change.
COPY pyproject.toml uv.lock README.md ./
RUN uv sync --frozen --no-install-project --no-dev

# Now copy the actual source and install the project itself.
COPY main.py tools.py ./
RUN uv sync --frozen --no-dev

ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8000

# Bind 0.0.0.0 so traffic from outside the container reaches the app.
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
