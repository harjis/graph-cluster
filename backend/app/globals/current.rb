module Current
  def self.tenant=(tenant)
    RequestStore.store[:current_tenant] = tenant
  end

  def self.tenant
    RequestStore.store[:current_tenant]
  end
end
