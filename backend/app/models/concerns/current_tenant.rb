module CurrentTenant
  extend ActiveSupport::Concern

  included do
    default_scope -> do
      if ActiveRecord::Base.connection.column_exists?(table_name, :tenant_id)
        raise CurrentTenantNil if Current.tenant.nil?
        where(tenant: Current.tenant)
      end
    end

    belongs_to :tenant

    validates :tenant, presence: true
  end
end
