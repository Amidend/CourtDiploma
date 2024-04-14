"""Initial database schema

Revision ID: 6b12808ac214
Revises: c8b2a6c480f1
Create Date: 2024-04-13 23:23:15.726601

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6b12808ac214'
down_revision: Union[str, None] = 'c8b2a6c480f1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
