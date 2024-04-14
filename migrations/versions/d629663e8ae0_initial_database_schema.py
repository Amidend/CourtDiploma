"""Initial database schema

Revision ID: d629663e8ae0
Revises: 6b12808ac214
Create Date: 2024-04-13 23:25:22.242150

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd629663e8ae0'
down_revision: Union[str, None] = '6b12808ac214'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
