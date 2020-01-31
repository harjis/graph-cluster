class TenantsController < ApplicationController
  def index
    render json: Tenant.all
  end

  def get_current
    render json: User.first.tenant
  end

  def set_current
    tenant = Tenant.find(params[:tenant_id])
    render json: User.first.update(tenant: tenant)
  end
end
