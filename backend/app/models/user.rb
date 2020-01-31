class User < ActiveRecord::Base
  belongs_to :tenant
  validates :tenant, presence: true
end
