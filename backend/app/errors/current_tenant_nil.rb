class CurrentTenantNil < StandardError
  def message
    'Current.tenant is not set! Be sure to call Current.tenant= before using models'
  end
end
