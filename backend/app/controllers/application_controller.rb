class ApplicationController < ActionController::API
  before_action :set_current_tenant

  def set_current_tenant
    Current.tenant = Tenant.first
  end
end
