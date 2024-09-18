local isUIOpen = false
local cachedSkills = nil

RegisterCommand('Vskills', function()
    ToggleUI()
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if Config.OpenKey and IsControlJustPressed(0, Config.OpenKey) then
            ToggleUI()
        end
    end
end)

function ToggleUI()
    isUIOpen = not isUIOpen
    if isUIOpen then
        TriggerServerEvent('zm_vorp_skills:getSkills')
    else
        SendNUIMessage({
            type = "close"
        })
        SetNuiFocus(false, false)
    end
end

RegisterNetEvent('zm_vorp_skills:receiveSkills')
AddEventHandler('zm_vorp_skills:receiveSkills', function(skills, firstname, lastname)
    cachedSkills = skills
    SendNUIMessage({
        type = "open",
        skills = skills,
        firstname = firstname,
        lastname = lastname,
        skillConfig = Config.Skills
    })
    SetNuiFocus(true, true)
end)

RegisterNUICallback('close', function(data, cb)
    ToggleUI()
    cb('ok')
end)