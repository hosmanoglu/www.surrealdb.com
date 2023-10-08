IF $scope = "admin" THEN
    ( SELECT * FROM admin_data WHERE access_level = 'full' )
ELSE IF $scope = "user" THEN
    IF $auth.role = "premium" THEN
        IF $auth.subscription_status = "active" THEN
            ( SELECT * FROM premium_user_data WHERE active = 1 )
        ELSE IF $auth.subscription_status = "trial" THEN
            ( SELECT * FROM trial_user_data )
        ELSE
            ( SELECT * FROM basic_user_data )
        END
    ELSE IF $auth.role = "standard" THEN
        ( SELECT * FROM standard_user_data WHERE region = 'US' )
    ELSE IF $auth.role = "standard" AND $auth.subscription_status = "active" THEN
        ( SELECT * FROM standard_user_data WHERE region = 'EU' )
    ELSE
        ( SELECT * FROM unauthorized_user_data )
    END
ELSE
    ( SELECT * FROM unknown_scope_data )
END
