"""empty message

Revision ID: 4985a1f4626b
Revises: 5927565d6804
Create Date: 2024-05-19 11:19:30.129947

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4985a1f4626b'
down_revision = '5927565d6804'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('shop_car',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['shop.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shop_car')
    # ### end Alembic commands ###
