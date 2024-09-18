local VORPcore = exports.vorp_core:GetCore()

RegisterServerEvent('zm_vorp_skills:getSkills')
AddEventHandler('zm_vorp_skills:getSkills', function()
    local _source = source
    local user = VORPcore.getUser(_source)
    if not user then return end
    
    local character = user.getUsedCharacter
    if not character then return end

    local skills = character.skills
    local firstname = character.firstname
    local lastname = character.lastname

    TriggerClientEvent('zm_vorp_skills:receiveSkills', _source, skills, firstname, lastname)
end)